import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobListService } from 'src/app/services/job-list.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  loading: boolean;
  job;

  constructor(
    private route: ActivatedRoute,
    private jobListService: JobListService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getJobDetails(this.route.snapshot.params.id);
  }

  getJobDetails(id): void {
    this.jobListService.getJobDetails(id).subscribe(res => {
      this.loading = false;
      this.job = res;
    });
  }

  company(): void {
    window.open(this.job.company_url, '_blank');
  }

  apply(): void {
    document.getElementById('apply').scrollIntoView();
  }

}
