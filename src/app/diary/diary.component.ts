import { Component, OnInit } from '@angular/core';
import { DiaryService } from './services/diary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  title = 'Diary Section';

  diaryForm: FormGroup;
  isModalOpen = false; 
  diaryEntries: any[] = [];

  subject$: Observable<string>;
  mood$: Observable<string>;
  date$: Observable<string>;
  note$: Observable<string>;

  constructor(private _diaryService: DiaryService, private fb: FormBuilder) {
    this.diaryForm = this.fb.group({
      subject: ['', Validators.required],
      mood: ['', Validators.required],
      date: ['', Validators.required],
      note: ['', Validators.required]
    });

    this.subject$ = this._diaryService.getField$('subject');
    this.mood$ = this._diaryService.getField$('mood');
    this.date$ = this._diaryService.getField$('date');
    this.note$ = this._diaryService.getField$('note');
  }

  // Initialize form values with current observable data
  ngOnInit(): void {
    // this.subject$.subscribe(subject => {
    //   this.diaryForm.get('subject')?.setValue(subject);
    // });
    // this.mood$.subscribe(mood => {
    //   this.diaryForm.get('mood')?.setValue(mood);
    // });
    // this.date$.subscribe(date => {
    //   this.diaryForm.get('date')?.setValue(date);
    // });
    // this.note$.subscribe(note => {
    //   this.diaryForm.get('note')?.setValue(note);
    // });

    // Retrieve diary entries from localStorage and set it to diaryEntries
    const storedEntries = localStorage.getItem('diaryEntries');
    if (storedEntries) {
      this.diaryEntries = JSON.parse(storedEntries);
    }
  }

  openModal(): void {
    this.isModalOpen = true;

    setTimeout(() => {
      const modalElement = document.getElementById('diaryModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();  
      }
    }, 0); 
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
    this.diaryForm.reset();

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  onSubmit(): void {
    if (this.diaryForm.valid) {
      const formValue = this.diaryForm.value;
      this._diaryService.setField('subject', formValue.subject);
      this._diaryService.setField('mood', formValue.mood);
      this._diaryService.setField('date', formValue.date);
      this._diaryService.setField('note', formValue.note);

      const newEntry = {
        subject: formValue.subject,
        mood: formValue.mood,
        date: formValue.date,
        note: formValue.note
      };

      this.diaryEntries.unshift(newEntry);

      this.diaryEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      localStorage.setItem('diaryEntries', JSON.stringify(this.diaryEntries));

      console.log(formValue);
      console.log(formValue.subject);
      console.log(formValue.mood);
      console.log(formValue.date);
      console.log(formValue.note);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your diary has been recorded!',
        showConfirmButton: true,
        timer: 2000
      });

      this.closeModal();

      this.diaryForm.reset();

      this.diaryForm.markAsUntouched();
    }
  }

  deleteDiaryEntry(index: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(117, 182, 117)',
      cancelButtonColor: 'rgb(255, 97, 97)',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.diaryEntries.splice(index, 1);  
        localStorage.setItem('diaryEntries', JSON.stringify(this.diaryEntries));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Diary entry deleted!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Deletion canceled',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  
}

