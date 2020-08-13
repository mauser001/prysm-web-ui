import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {
  balances: any;
  loading = false;

  constructor(private perfService: PerformanceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.perfService.getValidatorBalances().subscribe(
      (res) => {
        this.balances = res;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    )
  }
}
