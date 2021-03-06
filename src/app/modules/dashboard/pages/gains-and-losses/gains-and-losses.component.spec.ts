import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockComponent } from 'ng-mocks';
import { NgxEchartsModule } from 'ngx-echarts';

import { environment } from '../../../../../environments/environment';
import { GainsAndLossesComponent } from './gains-and-losses.component';
import { AccountListComponent }  from  '../../components/account-list/account-list.component';
import { BalancesChartComponent }  from  '../../components/balances-chart/balances-chart.component';
import { SharedModule } from '../../../shared/shared.module';
import { BeaconNodeStatusComponent } from '../../components/beacon-node-status/beacon-node-status.component';
import { ValidatorService } from 'src/app/modules/core/services/validator.service';
import { ChainService } from 'src/app/modules/core/services/chain.service';
import { ENVIRONMENT } from 'src/environments/token';

describe('GainsAndLossesComponent', () => {
  let component: GainsAndLossesComponent;
  let fixture: ComponentFixture<GainsAndLossesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        })
      ],
      declarations: [
        MockComponent(BeaconNodeStatusComponent),
        MockComponent(BalancesChartComponent),
        MockComponent(AccountListComponent),
        GainsAndLossesComponent,
      ],
      providers: [
        { 
          provider: ValidatorService, 
          useValue: jasmine.createSpyObj('ValidatorService', ['recentEpochBalances']),
        },
        { 
          provider: ChainService, 
          useValue: jasmine.createSpyObj('ChainService', ['chainHead$']),
        },
        { provide: ENVIRONMENT, useValue: environment },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainsAndLossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
