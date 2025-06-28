import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceComponent } from './market-place.component';

describe('MarketPlaceComponent', () => {
  let component: MarketPlaceComponent;
  let fixture: ComponentFixture<MarketPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
