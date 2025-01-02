import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class ChecklistComponent implements OnInit {
  checklist: { text: string; completed: boolean }[] = [];
  note = '';
  uniqueId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.uniqueId = this.route.snapshot.paramMap.get('id') || uuidv4();
    if (!this.route.snapshot.paramMap.get('id')) {
      this.router.navigate([this.uniqueId]);
    } else {
      this.loadChecklist();
    }
  }

  addChecklistItem(item: string): void {
    if (item.trim()) {
      this.checklist.push({ text: item, completed: false });
      this.note = '';
      this.saveChecklist();
    }
  }

  toggleCompletion(index: number): void {
    this.checklist[index].completed = !this.checklist[index].completed;
    this.saveChecklist();
  }

  saveChecklist(): void {
    this.http
      .post(`/api/checklist/${this.uniqueId}`, this.checklist)
      .subscribe();
  }

  loadChecklist(): void {
    this.http.get(`/api/checklist/${this.uniqueId}`).subscribe((data) => {
      this.checklist = (data as { text: string; completed: boolean }[]) || [];
    });
  }
}
