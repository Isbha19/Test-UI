import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {
  students: any[] = [];
  subjects: any[] = [];

  searchText: string = '';
  filter: string = '';

  constructor(private studentService: StudentService,private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudents();
    this.loadSubjects();
  }

  fetchStudents(): void {
    this.studentService.getStudents(this.searchText, this.filter).subscribe(data => {
      console.log("this worked");
      console.log(JSON.stringify(data))
      this.students = data;
    });
  }

  onSearch(): void {
    this.fetchStudents();
  }

  onFilterChange(filter: string): void {
    this.filter = filter;
    this.fetchStudents();
  }
  isModalOpen = false;
  isEditMode = false;
  newStudent = {
    studentName: '',
    subjectKey: '',
    grade: 0,
  };

editStudentKey!:number;
  openModal(student?: any) {
    this.isModalOpen = true;
    if (student) {
this.editStudentKey=student.studentKey;
      this.newStudent = { 
        studentName: student.studentName,
        subjectKey: student.subjectKey,  // Use subjectKey here
        grade: student.grade
      };      this.isEditMode = true;
    } else {
 this.newStudent = {
      studentName: '',
      subjectKey: '',
      grade: 0,
    };      this.isEditMode = false;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.clearForm();
  }

  clearForm() {
    this.newStudent = {
      studentName: '',
      subjectKey: '',
      grade: 0,
    };
  }
  loadSubjects() {
    this.studentService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }
  addStudent() {
    if (this.isEditMode) {
      this.studentService.editStudent(this.newStudent,this.editStudentKey).subscribe((response) => {
        console.log('Student updated successfully', response);
        this.fetchStudents(); // Refresh the table data
        this.closeModal();
      });
    } else {
      this.studentService.addStudent(this.newStudent).subscribe((response) => {
        console.log('Student added successfully', response);
        this.fetchStudents(); // Refresh the table data
        this.closeModal();
      });
    }
  }

  deleteStudent(studentKey: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentKey).subscribe((response) => {
        console.log('Student deleted successfully', response);
        this.fetchStudents(); // Refresh the table data
      });
    }
  }
  editStudent(student: any) {
    this.openModal(student); // Open modal with student details to edit
  }

}
