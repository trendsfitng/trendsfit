import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind as TailwindConfig } from '@react-email/tailwind';
import { EmailHeader } from './email-header.template';
import { EmailFooter } from './email-footer.template';
import { BRAND_NAME } from '@/utils/constants';

interface NewsletterSignupUserProps {
  name: string;
}

export const newLetterSignUpPlainText = (name: string) => {
  return `🎉 Welcome to the ${BRAND_NAME} Newsletter, ${name}! 🎉

Thank you for joining our community! You're now part of an exclusive group that gets first-hand access to the latest updates, expert insights, and special offers.

Stay tuned—exciting content is heading your way! 

If you have any questions or feedback, we’d love to hear from you.

Best regards,  
The ${BRAND_NAME} Team
`;
};

export default function NewsletterSignupUser({
  name,
}: NewsletterSignupUserProps) {
  return (
    <Html>
      <Head />
      <TailwindConfig>
        <Body className="bg-gray-50 text-gray-900 font-sans">
          <Container className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            {/* Header */}
            <EmailHeader />

            <Section className="my-8 text-center">
              <Text className="text-3xl font-extrabold text-[#5E503F]">
                🎉 Welcome to {BRAND_NAME}, {name}! 🎉
              </Text>
              <Text className="text-lg text-gray-700 mt-4">
                We’re thrilled to have you on board! Get ready for hand-picked
                insights, exclusive content, and special offers—delivered
                straight to your inbox.
              </Text>
              <Text className="text-lg text-gray-700 mt-4">
                Have questions or suggestions? We’d love to hear from you!
              </Text>
            </Section>

            {/* Footer */}
            <EmailFooter />
          </Container>
        </Body>
      </TailwindConfig>
    </Html>
  );
}
