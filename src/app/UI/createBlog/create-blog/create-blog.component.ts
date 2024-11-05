import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { select, Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
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
  ImageUpload,
  EditorConfig,
  MediaEmbed,
  Image,
  ImageInsert,
} from 'ckeditor5';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BlogState } from '../../../store/blog/blog.state';
import { TagsState } from '../../../store/tags/tags.state';
import { TagsAction } from '../../../store/tags/tags.actions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateTagComponent } from '../../create-tag/create-tag.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    NzUploadModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule,
    NzModalModule,
    CreateTagComponent,
    NzSpinModule,
    NzIconModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() tagForm: FormGroup;
  title: string = '';
  content: string = '';
  tags: string[] = [];
  uploadedFiles: any[] = [];
  blog: any;
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isModalVisible = false;
  isLoading = false;

  status$: Observable<boolean>;
  tagStatus$: Observable<boolean>;
  tags$: Observable<any>;
  private destroy$ = new Subject<void>();
  private tagCreationSuccess$ = new Subject<void>();

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
      ImageInsert,
      // ImageUpload
    ],
    toolbar: [
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'insertTable',
      '|',
      'link',
      'blockQuote',
      'code',

      // '|',
      // 'mediaEmbed',
      // 'insertImage',
      '|',
      'alignment',
    ],
    mediaEmbed: {
      previewsInData: true,
    },
  };

  onClose() {
    this.close.emit();
  }
  constructor(
    private msg: NzMessageService,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[''], Validators.required],
      file: [null, Validators.required],
    });

    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.status$ = this.store.select(BlogState.status);
    this.tagStatus$ = this.store.select(TagsState.status);
    this.tags$ = this.store.select(TagsState.tags);

    this.status$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response === true) {
        this.isLoading = false;
        this.msg.success('Blog created successfully');
        this.onClose();
      }
    });
    this.tagStatus$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response === true) {
        this.msg.success('Tag created successfully');
        this.tagForm.reset();
        this.store.dispatch(new TagsAction.GetTags());
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new TagsAction.GetTags());
  }

  onSubmit() {
    if (this.isLoading === true) {
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    this.blog = {
      title: this.form.value.title,
      content: this.form.value.content,
      tags: this.form.value.tags,
    };

    let blogdata = new Blob([JSON.stringify(this.blog)], {
      type: 'application/json',
    });

    formData.append('blog', blogdata);
    formData.append('file', this.uploadedFiles[0]);

    this.store.dispatch(new BlogAction.CreateBlog(formData));
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileUpload = input.files[0];
      if (fileUpload.size > 1 * 1024 * 1024) {
        this.msg.error('File size should not exceed 1MB');
        return;
      }
      this.uploadedFiles = Array.from(input.files);
      this.form.patchValue({ file: this.uploadedFiles[0].name });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string | ArrayBuffer | null; // Store the image data URL for preview
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  openCreateTag() {
    this.isModalVisible = true;
  }
  handleTagCreation(form: any): void {
    this.isModalVisible = false;
    this.store.dispatch(new TagsAction.CreateTag(form));
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
