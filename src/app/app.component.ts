import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Logout', url: '', icon: 'exit' }
  ];

  USERNAME = 'namasaya';
  public nama = '';
  showMenu = true;

  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cekSesi();
    console.log(this.nama);
  }

   async cekSesi() {
    const ambilNama = localStorage.getItem(this.USERNAME);
    if (ambilNama) {
      let namauser = ambilNama;
      this.nama = namauser;
    } else {
      this.showMenu = false; // Sembunyikan menu jika tidak ada sesi
    }
  }

  logout() {
    this.alertController
      .create({
        cssClass: 'logout-alert',
        header: 'Logout',
        subHeader: 'Apakah Anda yakin ingin keluar?',
        message: 'Anda akan keluar dari aplikasi.',
        buttons: [
          {
            text: 'Batal',
            role: 'cancel', // Memberikan peran 'cancel' pada tombol ini
            cssClass: 'secondary', // Menambahkan class CSS khusus untuk gaya tambahan
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Yakin',
            cssClass: 'danger', // Menambahkan class CSS untuk warna teks merah
            handler: (data: any) => {
              this.authService.logout();
              this.router.navigateByUrl('/', { replaceUrl: true });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
  }