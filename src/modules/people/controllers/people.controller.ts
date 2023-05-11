import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from '../services/people.service';
import { Person, PersonStatus } from '../entities/person.entity';
import { CreatePersonDto } from '../dto/person.dto';

@Controller('covid')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  async getCovidData(
    @Query('sexo') sexo?: string,
    @Query('edad') edad?: string,
  ): Promise<{
    total: number;
    hombres: number;
    mujeres: number;
    edad0_20: number;
    edad20_40: number;
    edad40_mas: number;
  }> {
    const result = await this.peopleService.getCovidData();

    if (sexo) {
      if (sexo === 'M') {
        result.total = result.hombres;
      } else if (sexo === 'F') {
        result.total = result.mujeres;
      }
    }

    if (edad) {
      if (edad === '0-20') {
        result.total = result.edad0_20;
      } else if (edad === '20-40') {
        result.total = result.edad20_40;
      } else if (edad === '40+') {
        result.total = result.edad40_mas;
      }
    }

    return result;
  }

  @Get('filter')
  async filterCovidData(
    @Query('ciudad') ciudad?: string,
    @Query('departamento') departamento?: string,
    @Query('atencion') atencion?: string,
    @Query('sexo') sexo?: string,
    @Query('edad') edad?: string,
  ): Promise<Person[]> {
    const result = await this.peopleService.filterCovidData(
      ciudad,
      departamento,
      atencion,
      sexo,
    );

    if (edad) {
      if (edad === '0-20') {
        result.length = result.filter((id) => {
          const paciente = covidData.find((item) => item.id_de_caso === id);
          return paciente.edad >= 0 && paciente.edad <= 20;
        }).length;
      } else if (edad === '20-40') {
        result.length = result.filter((id) => {
          const paciente = covidData.find((item) => item.id_de_caso === id);
          return paciente.edad > 20 && paciente.edad <= 40;
        }).length;
      } else if (edad === '40+') {
        result.length = result.filter((id) => {
          const paciente = covidData.find((item) => item.id_de_caso === id);
          return paciente.edad > 40;
        }).length;
      }
    }

    return result;
  }

  @Get(':id_de_caso')
  getOnePerson(@Param('id_de_caso') id_de_caso: number) {
    return this.peopleService.getOnePerson(id_de_caso);
  }

  @Delete(':id_de_caso')
  deletePerson(@Param('id_de_caso') id_de_caso: number) {
    this.peopleService.deletePerson(id_de_caso);
  }
}
