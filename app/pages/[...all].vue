<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
const links = useLinksContext()

const computedLinks = computed(() => links.map(link => ({
  label: link.label,
  to: link.to,
  target: '_self',
  trailingIcon: link.icon,
  description: link.description,
})))

const testimonials = [
  {
    quote: 'JSON Utilities has become an essential part of my development workflow. The formatter and validator tools have saved me countless hours of debugging. The cloud storage feature is particularly useful when working across different devices.',
    author: {
      name: 'Alexius Porro',
      description: 'Senior Software Engineer',
      avatar: {
        src: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 10 + 0)}`,
        loading: 'lazy',
      },
    },
  },
  {
    quote: 'As a data analyst, I work with JSON files daily. This toolkit has everything I need in one place. The schema validator and formatter are incredibly reliable, and the dark mode is easy on the eyes during late-night analysis sessions.',
    author: {
      name: 'Critical Martín',
      description: 'Data Analytics Lead',
      avatar: {
        src: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 10 + 1)}`,
        loading: 'lazy',
      },
    },
  },
  {
    quote: 'The JSON diff tool is a game-changer for our QA process. Being able to quickly compare API responses has significantly improved our testing efficiency. Plus, the interface is clean and intuitive.',
    author: {
      name: 'Blocker Menéndez',
      description: 'QA Team Lead',
      avatar: {
        src: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 10 + 2)}`,
        loading: 'lazy',
      },
    },
  },
  {
    quote: 'I appreciate how this tool combines all essential JSON operations in one place. The ability to store and retrieve frequently used schemas has made our API documentation process much more streamlined.',
    author: {
      name: 'Mortem Horst',
      description: 'Software Engineer',
      avatar: {
        src: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 10 + 3)}`,
        loading: 'lazy',
      },
    },
  },
  {
    quote: 'As someone who teaches web development, I often recommend JSON Utilities to my students. The open-source nature and clean implementation make it both a practical tool and a great learning resource.',
    author: {
      name: 'Smoggy Mate',
      description: 'Technical Instructor',
      avatar: {
        src: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 10 + 4)}`,
        loading: 'lazy',
      },
    },
  },
  {
    quote: 'The real-time collaboration features have transformed how our team handles JSON data. We use it for everything from API testing to configuration management. The ability to share and collaborate on JSON files has eliminated a lot of back-and-forth in our development process.',
    author: {
      name: 'Chavo Vincent',
      description: 'Engineering Manager',
      avatar: {
        src: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 10 + 5)}`,
        loading: 'lazy',
      },
    },
  },
]
</script>

<template>
  <div>
    <ULandingHero
      title="JSON Utilities"
      description="The ultimate JSON toolkit"
      :links="computedLinks"
    >
      <template #headline>
        <UBadge
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          {{ $config.public.siteName }}
        </UBadge>
      </template>

      <NuxtImg
        src="/hero.png"
        alt="JSON Utilities"
        fit="contain"
        quality="80"
        width="1200"
        height="610"
        format="webp"
        provider="cloudflare"
        sizes="100vw xs:400px sm:600px md:750px lg:1200px"
      />

      <div class="h-10 w-10 md:hidden bg-red-500" />
    </ULandingHero>

    <ULandingSection
      title="Features"
      description="All the JSON utilities you need. Open source."
      headline="What you will find"
    >
      <UPageGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="link in computedLinks"
          :key="link.to as string"
          test-landing-card
          :title="link.label"
          :description="link.description"
          :icon="link.trailingIcon"
        />
        <ULandingCard
          title="Storage"
          test-landing-card
          description="Store your JSON data in the cloud associated with your github or gmail account. You can store, delete and load your JSON data so you can save your work and come back later."
          icon="i-heroicons-cloud"
        />
        <ULandingCard
          title="Customizable UI"
          test-landing-card
          description="Customize the UI to your liking. You can use your preferred themes and colors. Also available in dark/light mode."
          icon="i-gridicons-customize"
        />
        <ULandingCard
          title="Open Source"
          test-landing-card
          icon="i-vscode-icons-file-type-nuxt"
          description="You can clone and host this application on your own infrastructure. It's all open source. Built with Nuxt and Vue."
        />
      </UPageGrid>
    </ULandingSection>
    <ULandingSection
      headline="What people are saying"
      title="Testimonials"
      description="What people are saying about JSON Utilities"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            test-landing-testimonial
            v-bind="testimonial"
          />
        </div>
      </UPageColumns>
    </ULandingSection>
    <ULandingSection>
      <ULandingCTA
        title="Try JSON generation"
        description="Start using JSON Utilities today"
        :links="[{ label: 'Get started', to: '/json/generate' }]"
      />
    </ULandingSection>
  </div>
</template>
