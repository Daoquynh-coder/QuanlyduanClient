import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class DummyDataService {

    isUsingDummyData: boolean = false;

    constructor(
        private http: HttpClient,
        private toastr: ToastrService) {}

createPorfolioList(count: any = null): any {
        var list = [];
        // if (count ==null ) count = this._getRandomNumber(30);
        for (var i = 0; i < count; i ++) {
            list.push({
                index: i,
                // soHS: this._getRandomNumber(1000000),
                ngaytao: Date.now(),
                stt: '1',
                socontainer: 'BLUS-23092762',
                hangtau: 'VinaShin',
                chucontainer: 'SHIN HAI',
                thoigiannhap: '16/07/2019 9:00:00',
                tinhtrang: 'khong loi',
                thaotac: '',
                codeemployee:'0000002352',
                name:'Nguyễn Văn A',
                address:'NEW YORK',
                historywork:'Giao nhận container',
                time:'16/07/2019 08:00:02',
                acaction:'',
                datainput:'16BH-302.92',
                digital_information:'Số xe',
                datafix:'16BH-302.91',
                codebug:'CMSE-010',
                typebug:'Biến dạng',
                notification:'Biến dạng của trụ góc, đà ngang, đà dọc;',
                description:'Các lỗi biến dạng xảy ra trên các trụ góc, các rail',
                codeship:'0000002352',
                numbership:'1',
                landingdate:'16/07/2019 08:00:02',
                editdate:'16/07/2019 08:00:02',
                landinglead:'syy44363',
                status:'Không có lỗi',
                namecp:'CHECK POINT #1',
                cameranumber:'10.0.0.1',
                shell_owner:'MAESK',
                damage:'Phình, Bẹp, Rách',
                checkpoint:'Checkpoint#01',
                container_pass:'40',
                container_bug:'5'
            })
        }
        return {data: list};
    }

    private popError(error: any) {
        //console.log (error.status);
        if (error.status === 400) {
            const listErrorMessages = [];
            for (const message of error.error.messages) {
                listErrorMessages.push(message.content);
            }
            if (listErrorMessages.length > 0) {
                this.toastr.error(listErrorMessages.join('<br/>'), 'Error');
            }
        }
    }

    public APICallExample(inputParam: any, funcCallBack: any, isUpdate: boolean = false): void {
        var url = "http://example.com"
        this.http.post(url, inputParam)
        .pipe().subscribe(
        (response: any) => {
            //console.log(response);
            funcCallBack(response);
        },
        error => {
            this.popError(error);
        });
    }

}
