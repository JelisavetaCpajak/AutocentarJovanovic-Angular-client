import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KreiranjeRacunaPage } from './kreiranje-racuna.page';

describe('KreiranjeRacunaPage', () => {
  let component: KreiranjeRacunaPage;
  let fixture: ComponentFixture<KreiranjeRacunaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KreiranjeRacunaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KreiranjeRacunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
