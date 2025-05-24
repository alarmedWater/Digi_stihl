import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { environment }    from '../../environments/environment';
import { EmployeeDto }    from '../features/models/employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/employees`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service  = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    const mockData: EmployeeDto[] = [
      {
        employeeId: 1,
        name: 'Max',
        vorname: 'Mustermann',
        eintritt: '2023-01-01',
        befristung: undefined,
        verlaengerung1: undefined,
        verlaengerung2: undefined,
        befristungMax: undefined,
        freistellung: undefined,
        kuendigung: undefined,
        austrittsart: '',
        bemerkung: undefined,
        funktion: '',
        kostenstelle: '1001',
        fte: 1,
        bereich: 'IT',
        mengenabhaengig: '',
        arbeitsverhaeltnis: 'Vollzeit'
      }
    ];

    service.getEmployees().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create an employee', () => {
    const newEmp: EmployeeDto = {
      employeeId: 0,
      name: 'Anna',
      vorname: 'Schmidt',
      eintritt: '2024-05-01',
      befristung: undefined,
      verlaengerung1: undefined,
      verlaengerung2: undefined,
      befristungMax: undefined,
      freistellung: undefined,
      kuendigung: undefined,
      austrittsart: '',
      bemerkung: undefined,
      funktion: '',
      kostenstelle: '1002',
      fte: 1,
      bereich: 'HR',
      mengenabhaengig: '',
      arbeitsverhaeltnis: 'Vollzeit'
    };

    service.createEmployee(newEmp).subscribe(created => {
      expect(created).toEqual(newEmp);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmp);
    req.flush(newEmp);
  });
});
