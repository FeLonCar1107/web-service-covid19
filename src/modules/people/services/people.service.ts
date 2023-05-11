import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Person, PersonStatus } from '../entities/person.entity';
import { CreatePersonDto } from '../dto/person.dto';
import { HttpCustomService } from 'src/modules/providers/http/http/http.service';
@Injectable()
export class PeopleService {
  constructor(
    @Inject('UUID') private readonly uuid: string,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private httpCustomService: HttpCustomService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async updateDataAuto(): Promise<void> {
    const data = await this.httpCustomService.getDataCovid19();

    for (const item of data) {
      const {
        ciudad_municipio_nom,
        departamento_nom,
        edad,
        sexo,
        tipo_recuperacion,
        fecha_diagnostico,
      } = item;

      const existingData = await this.personRepository.findOne({
        where: {
          ciudad_municipio_nom,
          departamento_nom,
          edad,
          sexo,
          tipo_recuperacion,
          fecha_diagnostico,
        },
      });

      if (!existingData) {
        const newData = this.personRepository.create({
          ciudad_municipio_nom,
          departamento_nom,
          edad,
          sexo,
          tipo_recuperacion,
          fecha_diagnostico,
        });
        await this.personRepository.save(newData);
      }
    }
  }

  public async filterCovidData(
    ciudad?: string,
    departamento?: string,
    estado?: string,
    sexo?: string,
  ): Promise<Person[]> {
    const where: any = {};

    if (ciudad) {
      where.ciudad_de_ubicaci_n = Like(`%${ciudad}%`);
    }

    if (departamento) {
      where.departamento = Like(`%${departamento}%`);
    }

    if (estado) {
      where.atenci_n = Like(`%${estado}%`);
    }

    if (sexo) {
      where.sexo = sexo.toUpperCase();
    }

    return this.personRepository.find({ where });
  }

  async getCovidData(): Promise<{
    total: number;
    hombres: number;
    mujeres: number;
    edad0_20: number;
    edad20_40: number;
    edad40_mas: number;
  }> {
    const covidData = await this.httpCustomService.getDataCovid19();
    const hombres = covidData.filter((item) => item.sexo === 'M').length;
    const mujeres = covidData.filter((item) => item.sexo === 'F').length;
    const edad0_20 = covidData.filter(
      (item) => item.edad >= 0 && item.edad <= 20,
    ).length;
    const edad20_40 = covidData.filter(
      (item) => item.edad > 20 && item.edad <= 40,
    ).length;
    const edad40_mas = covidData.filter((item) => item.edad > 40).length;

    return {
      total: covidData.length,
      hombres,
      mujeres,
      edad0_20,
      edad20_40,
      edad40_mas,
    };
  }

  public async deletePerson(id_de_caso: number): Promise<void> {
    await this.personRepository.delete(id_de_caso);
  }

  public async getOnePerson(id_de_caso: number): Promise<Person> {
    return this.personRepository.findOne({ where: { id_de_caso: id_de_caso } });
  }
}
