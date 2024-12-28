import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if user is authenticated', async () => {
    authServiceSpy.isAuthenticated.and.returnValue(Promise.resolve(true));

    const canActivate = await guard.canActivate(null as any, null as any);
    expect(canActivate).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /tab1 if user is not authenticated', async () => {
    authServiceSpy.isAuthenticated.and.returnValue(Promise.resolve(false));

    const canActivate = await guard.canActivate(null as any, null as any);
    expect(canActivate).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tab1']);
  });
});
