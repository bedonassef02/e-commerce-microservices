import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFactorService {
  generateSecret(email: string): string {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `E-Commerce (${email})`,
      issuer: 'E-Commerce',
    });

    return secret.base32;
  }

  generateOTPAuthURL(secret: string, email: string): string {
    return speakeasy.otpauthURL({
      secret,
      label: email,
      issuer: 'E-Commerce',
      encoding: 'base32',
    });
  }

  async generateQRCode(otpAuthURL: string): Promise<string> {
    try {
      return qrcode.toDataURL(otpAuthURL);
    } catch (error) {
      throw new Error('Error generating QR code');
    }
  }

  verifyToken(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    });
  }
}
