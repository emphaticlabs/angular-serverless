# LaLiga&reg;

## Project Demo for Workshop "Angular Serverless with AWS Services"

![angular serverless](/src/assets/img/angular-serverless.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Generals:
  This project was developed for a workshop, my purpose was present a readily available solution to develop
  scalable MVP's succinctly

## From my perspective the most interesting aspects of the project are:

  1.  Uses [Angular][1] V 5.1 Newer version! (Dec 2017)
  2.  Integrates Angular (Frontend) with AWS in a serverless fashion
        * AWS Cognito: User Management, Security
        * AWS API Gateway: Generates API's endpoints and dance tango with Cognito to ensure
          only user's with the right role gets the data
        * AWS Lambda: Functions, logic that is event driven or "on demand" this functions reads, writes
          to a database (DynamoDB) kickstart another services; all without the need of
          provisioning any server.
  3.  For me (Fronted Dev) it's of particular interest the new [HttpClientModule][2], here we use
      interceptors to manage headers automatically
         ```javascript
          @Injectable()
          export class LaLigaAuthInterceptor implements HttpInterceptor {
            intercept(
              request: HttpRequest<any>,
              next: HttpHandler
            ): Observable<HttpEvent<any>> {
              const headers = request.headers;
              if (!headers.has('Authorization')) {
                const req = request.clone({
                  setHeaders: {
                    'X-Auth-Token': `${environment.fbDataKey}`
                  }
                });
                return next.handle(req);
              }
              return next.handle(request);
            }
          }
          ```
---

## **NEXT STEPS**:

  - [ ] Implement [Angular Service Worker][3]
  - [ ] Finish the bet list view (now only shows raw JSON)
  - [ ] Change labels from Spanish to English; don't think go multi-language




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.



[1]: https://angular.io/
[2]: https://angular.io/tutorial/toh-pt6#http
[3]: https://angular.io/guide/service-worker-intro#introduction-to-angular-service-workers