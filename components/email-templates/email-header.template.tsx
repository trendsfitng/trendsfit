import { BRAND_NAME } from '@/utils/constants';
import { Img, Section } from '@react-email/components';

export const EmailHeader = () => (
  <Section className="text-center mb-8">
    <Img
      src="https://res.cloudinary.com/djl8y6t5y/image/upload/v1750940314/tof-logo.png"
      alt={BRAND_NAME}
      className="mx-auto w-32"
    />
  </Section>
);
