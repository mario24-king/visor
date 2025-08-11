import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalHome } from './principal-home';

describe('PrincipalHome', () => {
  let component: PrincipalHome;
  let fixture: ComponentFixture<PrincipalHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
