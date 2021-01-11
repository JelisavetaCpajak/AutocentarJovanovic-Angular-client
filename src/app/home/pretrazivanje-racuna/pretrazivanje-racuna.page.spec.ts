import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PretrazivanjeRacunaPage } from './pretrazivanje-racuna.page';

describe('PretrazivanjeRacunaPage', () => {
  let component: PretrazivanjeRacunaPage;
  let fixture: ComponentFixture<PretrazivanjeRacunaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretrazivanjeRacunaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PretrazivanjeRacunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
