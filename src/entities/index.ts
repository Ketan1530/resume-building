/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: resumetemplates
 * Interface for ResumeTemplates
 */
export interface ResumeTemplates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  templateName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  previewImage?: string;
  /** @wixFieldType text */
  layoutConfig?: string;
  /** @wixFieldType text */
  description?: string;
}
