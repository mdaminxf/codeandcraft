import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  await prisma.projects.createMany({
    data: [
      {
        title: 'Portfolio Website',
        image: 'https://picsum.photos/150?random=1', // Random image from Lorem Picsum
        description: 'A personal portfolio website to showcase my work and skills.',
        skills: 'React, Next.js, Tailwind',
        link: 'https://www.example.com/portfolio', // Link to the project
      },
      {
        title: 'E-commerce Store',
        image: 'https://picsum.photos/150?random=2', // Random image from Lorem Picsum
        description: 'An online store for buying products, including payment integration.',
        skills: 'React, Node.js, Express, MongoDB',
        link: 'https://www.example.com/store', // Link to the project
      },
      {
        title: 'Social Media App',
        image: 'https://picsum.photos/150?random=3', // Random image from Lorem Picsum
        description: 'A social media platform for connecting people and sharing content.',
        skills: 'React, Firebase, Tailwind, Redux',
        link: 'https://www.example.com/social', // Link to the project
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
