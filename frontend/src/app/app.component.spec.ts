import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

/**
 * Test suite for the AppComponent.
 */
describe('AppComponent', () => {
  /**
   * Asynchronous setup function to configure the testing module before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  /**
   * Test case to ensure that the app component is created successfully.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test case to verify that the app has the correct title.
   */
  it(`should have the 'personalplanung-tool' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('personalplanung-tool');
  });

  /**
   * Test case to verify that the title is rendered in the component's template.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, personalplanung-tool');
  });
});
