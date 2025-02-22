import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCompromissoComponent } from './formulario-compromisso.component';

describe('FormularioCompromissoComponent', () => {
  let component: FormularioCompromissoComponent;
  let fixture: ComponentFixture<FormularioCompromissoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCompromissoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
