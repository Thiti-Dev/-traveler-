import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofThreadComponent } from './proof-thread.component';

describe('ProofThreadComponent', () => {
  let component: ProofThreadComponent;
  let fixture: ComponentFixture<ProofThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
