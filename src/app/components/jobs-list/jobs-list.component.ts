import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobListService } from 'src/app/services/job-list.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  description = '';
  isFullTime = false;
  location = '';
  data;
  loading: boolean;

  constructor(
    private jobListService: JobListService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.getJobs();
  }

  getJobs(): void {
    this.jobListService.getJobs(this.description, this.isFullTime, this.location).subscribe(res => {
      this.loading = false;
      this.data = res;
    });
  }

  fullTime(isFullTime): void {
    this.isFullTime = isFullTime.checked;
  }

  jobDetails(id): void {
    this.router.navigate(['/job', id]);
  }

}
