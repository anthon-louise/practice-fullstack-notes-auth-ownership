export class AppError extends Error {
  statusCode: number;

  constructor(mesage: string, statusCode: number = 500) {
    super(mesage);
    this.statusCode = statusCode;
  }
}
