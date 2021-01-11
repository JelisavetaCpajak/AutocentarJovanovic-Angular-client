import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IzmeniStavkuRacunaComponent } from './izmeni-stavku-racuna.component';

describe('IzmeniStavkuRacunaComponent', () => {
  let component: IzmeniStavkuRacunaComponent;
  let fixture: ComponentFixture<IzmeniStavkuRacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniStavkuRacunaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IzmeniStavkuRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
