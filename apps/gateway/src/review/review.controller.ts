import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RpcExceptionInterceptor } from '@app/common/utils/exception/rpc-exception.filter';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { User } from '@app/common/decorators/user.decorator';
import { REVIEW_SERVICE } from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/commands';
import { ReviewDto } from '@app/common/dto/review/review.dto';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('review')
@Controller('review')
@UseInterceptors(RpcExceptionInterceptor)
export class ReviewController {
  constructor(@Inject(REVIEW_SERVICE) private reviewService: ClientProxy) {}
  @Post()
  createOrUpdate(@User('id') user: string, @Body() reviewDto: ReviewDto) {
    reviewDto.user = user;
    return this.reviewService.send(Commands.Review.CREATE_OR_UPDATE, reviewDto);
  }

  @Get(':product')
  findOne(@User('id') user: string, @Param('product') product: string) {
    const reviewDto: ReviewDto = { user, product };
    return this.reviewService.send(Commands.Review.FIND_ONE, reviewDto);
  }

  @Get(':product/all')
  findAll(@Param('product') product: string) {
    return this.reviewService.send(Commands.Crud.FIND_ALL, product);
  }
}
