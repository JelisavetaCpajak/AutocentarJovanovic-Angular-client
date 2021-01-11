import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovaStavkaRacunaComponent } from './nova-stavka-racuna.component';

describe('NovaStavkaRacunaComponent', () => {
  let component: NovaStavkaRacunaComponent;
  let fixture: ComponentFixture<NovaStavkaRacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaStavkaRacunaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovaStavkaRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
