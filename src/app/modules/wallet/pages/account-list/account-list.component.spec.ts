import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListComponent } from './account-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { WalletService } from '../../../core/services/wallet.service';
import { MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { ListAccountsResponse } from '../../../../proto/validator/accounts/v2/web_api';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let service: WalletService = MockService(WalletService);
  service.accounts$ = of({
    accounts: [{
      validatingPublicKey: null,
      accountName: 'Fritz',
      depositTxData: null,
      derivationPath: 'somepath'
    }]
  } as ListAccountsResponse);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
      ],
      declarations: [AccountListComponent],
      providers: [
        { provide: WalletService, useValue: service },
      ]
    })
      .compileComponents();
    service = TestBed.get(WalletService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
