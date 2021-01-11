import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IzmeniRacunPage } from './izmeni-racun.page';

describe('IzmeniRacunPage', () => {
  let component: IzmeniRacunPage;
  let fixture: ComponentFixture<IzmeniRacunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmeniRacunPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IzmeniRacunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
