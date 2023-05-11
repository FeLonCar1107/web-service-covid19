import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpCustomService {
  public async getDataCovid19() {
    try {
      const response = await axios.get(
        'https://www.datos.gov.co/resource/gt2j-8ykr.json',
      );
      const covidData = response.data;
      return covidData;
    } catch (error) {
      console.log(error);
    }
  }
}
