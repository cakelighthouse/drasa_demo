import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';

import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/drasa_demo')
  async drasaDemo(): Promise<any> {
    return this.appService.getHello();
  }

  @Post('/drasa_demo/push')
  async getHello2(@Body() data): Promise<any> {
    console.log(data);
    const test: any = await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: data.user_id,
        messages: [
          {
            type: 'text',
            text: 'ขอบคุณที่ลงทะเบียนกับเรา',
          },
        ],
      },
      {
        headers: {
          Authorization:
            'Bearer Clv6JGHH7tldT24NaLNU1eF68EPCkhZPlcTyoIex5+UgjwMp88ToUGBZuXtSooDySPFjk5CM3ID89jaXrpQz04PRkNScWeZ/UgwOAkbipWjlj73O6YsRXaA9t3ZoDe6wg3mtsV15yv3lX2qjnWmglwdB04t89/1O/w1cDnyilFU=',
        },
      },
    );
    console.log(test.data);
    return this.appService.getHello();
  }

  @Post('/drasa_demo/customers/push')
  async getHello3(@Body() data): Promise<any> {
    let message: any;
    if (data.type === 'doctor') {
      message = {
        sender: {
          name: 'ทีมแพทย์',
          iconUrl:
            'https://img.freepik.com/free-vector/hand-drawn-doctor-answer-questions-clipart-gesture-character_40876-3115.jpg?w=1380&t=st=1706512298~exp=1706512898~hmac=c136496bb660ac935c0a7b212b11398f05acf583920ee80a9512080791f6838a',
        },
        type: 'text',
        text: 'ทีมแพทย์ได้รับข้อมูลแล้ว ทีมพยาบาลจะแจ้งค่าใช้จ่ายต่อไป',
      };
    } else if (data.type === 'nurse') {
      message = {
        sender: {
          name: 'ทีมพยาบาล',
          iconUrl:
            'https://img.freepik.com/free-vector/doctor-nurse-holding-syringe-vaccination_40876-3792.jpg?w=1380&t=st=1706512335~exp=1706512935~hmac=e8f85e4e17c9442dd9ade812496f31014fa9429a9528523b70f0e5f9d68bde50',
        },
        type: 'template',
        altText: 'แจ้งราคาค่าบริการ',
        template: {
          type: 'buttons',
          thumbnailImageUrl:
            'https://img.freepik.com/free-photo/cheerful-asian-dentists-posing-treatment-room-clinic-front-equipment_1098-20373.jpg?w=1800&t=st=1706171344~exp=1706171944~hmac=49826a3ae4099a6fe06ecaffc480af8096d3c64843ed0d92b1b6b4ced2c505c4',
          imageAspectRatio: 'rectangle',
          imageSize: 'cover',
          imageBackgroundColor: '#FFFFFF',
          title: 'แจ้งค่าปรึกษาแพทย์',
          text: '1000 บาท',
          actions: [
            {
              type: 'postback',
              style: 'primary',
              label: 'ปรึกษาเลย',
              data: 'action=buy&itemid=123',
            },
            {
              type: 'uri',
              label: 'ดูรายละเอียด',
              uri: 'https://www.doctorasa.co',
            },
            {
              type: 'postback',
              label: 'ยกเลิก',
              data: 'action=add&itemid=123',
            },
          ],
        },
      };
    }
    const test: any = await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: data.user_id,
        messages: [message],
      },
      {
        headers: {
          Authorization:
            'Bearer Clv6JGHH7tldT24NaLNU1eF68EPCkhZPlcTyoIex5+UgjwMp88ToUGBZuXtSooDySPFjk5CM3ID89jaXrpQz04PRkNScWeZ/UgwOAkbipWjlj73O6YsRXaA9t3ZoDe6wg3mtsV15yv3lX2qjnWmglwdB04t89/1O/w1cDnyilFU=',
        },
      },
    );
    console.log(test.data);
    return this.appService.getHello();
  }

  @Post('/drasa_demo/save')
  async save(@Body() data): Promise<any> {
    const fs = require('fs');

    try {
      let rawdata = fs.readFileSync('/tmp/data.json');
      console.log(JSON.parse(rawdata));
    } catch {
      fs.writeFileSync('/tmp/data.json', JSON.stringify([]));
    }

    let rawdata = fs.readFileSync('/tmp/data.json');
    var dataMerge = JSON.parse(rawdata);

    var dataAdd = dataMerge.concat(data);
    fs.writeFileSync('/tmp/data.json', JSON.stringify(dataAdd));

    const test: any = await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: data.user_id,
        messages: [
          {
            type: 'text',
            text: 'ขอบคุณที่ลงทะเบียนกับเรา',
          },
        ],
      },
      {
        headers: {
          Authorization:
            'Bearer Clv6JGHH7tldT24NaLNU1eF68EPCkhZPlcTyoIex5+UgjwMp88ToUGBZuXtSooDySPFjk5CM3ID89jaXrpQz04PRkNScWeZ/UgwOAkbipWjlj73O6YsRXaA9t3ZoDe6wg3mtsV15yv3lX2qjnWmglwdB04t89/1O/w1cDnyilFU=',
        },
      },
    );

    return this.appService.getHello();
  }

  @Get('/drasa_demo')
  async one(@Query('email') email): Promise<any> {
    try {
      const fs = require('fs');
      console.log(email);
      var raw = JSON.parse(fs.readFileSync('/tmp/data.json'));
      console.log(raw);
      var rta = raw.filter((it) => it.email === email);
      console.log(rta);
      if (rta.length === 0) {
        return [];
      }
      return rta[0];
    } catch {
      return [];
    }
  }

  @Get('/drasa_demo/all')
  async all(): Promise<any> {
    try {
      const fs = require('fs');
      var raw = JSON.parse(fs.readFileSync('/tmp/data.json'));
      console.log(raw);

      return raw;
    } catch {
      return [];
    }
  }
}
