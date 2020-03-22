import { PipeTransform, BadRequestException } from '@nestjs/common';
import { StudentSize } from '../student-size.enum';

export class StudentSizeValidationPipe implements PipeTransform {
  readonly allowedSizees = [
    StudentSize.XS,
    StudentSize.S,
    StudentSize.M,
    StudentSize.L,
    StudentSize.XL,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isSizeValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid size`);
    }

    return value;
  }

  private isSizeValid(size: any) {
    const idx = this.allowedSizees.indexOf(size);
    return idx !== -1;
  }
}
