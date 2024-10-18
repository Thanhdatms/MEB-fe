import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {environment} from '../../../../environment/environment'
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, Font, Code, CodeBlock, BlockQuote, Table, Alignment, Link,  ImageUpload, EditorConfig, MediaEmbed, Image, ImageInsert } from 'ckeditor5';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    NzUploadModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {
  @Output() close = new EventEmitter<void>();

  title: string = ''; 
  content: string = ''; 
  tags: string[] = [];
  uploadedFiles: any[] = [];
  blog: any;
  form : FormGroup

  onClose() {
    this.close.emit();
  }
  constructor(
    private msg: NzMessageService,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['',Validators.required],
      content: ['', Validators.required],
      file: [null, Validators.required]
    })
  }

  onSubmit() { 
    if (this.form.invalid) {
      console.log(this.form)
        this.msg.error('Please fill in all required fields.');
        return; 
    }

    const formData = new FormData(); 
    this.blog = {
      title: this.form.value.title, 
      content: this.form.value.content, 
      created_at: new Date().toISOString(),
    }

    let blogdata = new Blob([JSON.stringify(this.blog)], { type: 'application/json' });

    formData.append('blog', blogdata); 
    formData.append('file', this.uploadedFiles[0]); 

    this.store.dispatch(new BlogAction.CreateBlog(formData)).subscribe(() => {
        this.msg.success('Blog created successfully!');
        this.onClose(); 
    });
}

  onFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          this.uploadedFiles = Array.from(input.files);
          this.form.patchValue({ file: this.uploadedFiles[0].name });
      }
  }

  editor = ClassicEditor;
  
  editorConfig: EditorConfig = {
      plugins: [
          Bold, 
          Essentials, 
          Italic, 
          Mention, 
          Paragraph, 
          Undo, 
          Heading,
          Font, 
          Code, 
          CodeBlock, 
          BlockQuote, 
          Table, 
          Alignment,
          Link,
          MediaEmbed,
          Image,
          ImageInsert
          // ImageUpload
        ],
      toolbar: [
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor' ,
            '|',
            'bold', 'italic','insertTable', 
            '|',
            'link', 'blockQuote', 'code',
            
            '|',
            'mediaEmbed',
            // 'insertImage',
            '|',
            'alignment', 


        ],

    
  };
}
