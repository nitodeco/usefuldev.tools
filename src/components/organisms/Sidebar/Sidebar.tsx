'use client';

import React, { type ReactNode } from 'react';

import { Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import posthog from 'posthog-js';

import { useRouter } from 'next/navigation';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarPrimitive,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';

import { pages } from '@/config/pages';

type Props = {
  children: ReactNode;
  defaultOpen?: boolean;
};

export const Sidebar: React.FC<Props> = ({ children, defaultOpen = true }) => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarPrimitive collapsible='icon' className='group'>
        <SidebarHeader className='border-b border-sidebar-border p-4'>
          <div
            className='flex items-center gap-2 hover:cursor-pointer'
            onClick={() => {
              router.push('/');
            }}
          >
            <Wrench className='h-5 w-5' />
            <h2 className='text-lg font-semibold truncate group-data-[collapsible=icon]:hidden'>
              {t('sidebar.appName')}
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='group-data-[collapsible=icon]:sr-only'>
              {t('sidebar.navigation')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {pages
                  .filter((page) => page.showInSidebar)
                  .map((page) => (
                    <SidebarMenuItem key={page.key}>
                      {/* @ts-expect-error */}
                      <SidebarMenuButton asChild tooltip={t(page.key)}>
                        <a href={page.href} onClick={() => posthog.capture(`${page.key} clicked`)}>
                          {page.icon && <page.icon className='h-4 w-4' />}
                          {/* @ts-expect-error */}
                          <span className='group-data-[collapsible=icon]:sr-only'>{t(page.key)}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarBorderToggle />
      </SidebarPrimitive>
      <main className='flex-1 flex flex-col min-h-screen'>{children}</main>
    </SidebarProvider>
  );
};

const SidebarBorderToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className='absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-border/50 transition-colors'
      onClick={toggleSidebar}
      role='button'
      tabIndex={0}
      aria-label='Toggle sidebar'
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleSidebar();
        }
      }}
    />
  );
};
