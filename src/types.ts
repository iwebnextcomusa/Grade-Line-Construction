/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  bulletPoints: string[];
  imageUrl: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Excavation" | "Grading" | "SitePrep" | "Utilities" | "Clearing" | "Driveways";
  description: string;
  location: string;
  completedYear: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number; // e.g. 5
  text: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  isError?: boolean;
}
