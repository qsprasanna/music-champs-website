// lib/leads/types.ts

export type LeadAction =
  | 'demo' // "Book a Demo" — general inquiry
  | 'trial' // "Book Your Trial Class"
  | 'register' // "Register Now" on a specific course
  | 'event' // "Register Now" on an event
  | 'welcome'; // First-visit popup

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  interest: string; // instrument / course name / "General"
  action: LeadAction;
  courseSlug?: string; // only for register action
  source: string; // page pathname e.g. "/courses/guitar-lessons"
  message?: string;
};

export type LeadModalConfig = {
  action: LeadAction;
  courseSlug?: string;
  courseTitle?: string;
  eventTitle?: string;
};
