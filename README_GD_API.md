# Graphic Design Portfolio API Documentation

## Overview
Complete MongoDB + Express backend for a Behance-like graphic design portfolio with advanced filtering, search, and pagination capabilities.

## Tech Stack
- **Database**: MongoDB (NoSQL)
- **ODM**: Mongoose
- **Framework**: Express.js
- **Node.js**: v14+

## API Endpoints

### Base URL
```
/api/gd/projects
```

---

## Endpoints

### 1. GET /api/gd/projects
Get a paginated list of projects with filtering and search capabilities.

#### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | `"all"` | Filter by category or "all" for all categories |
| `q` | string | `""` | Full-text search across title, tags, and description |
| `sort` | string | `"newest"` | Sort order: "newest", "oldest", or "az" |
| `page` | number | `1` | Page number (min: 1) |
| `limit` | number | `12` | Items per page (min: 1, max: 100) |
| `includeDraft` | string | `"false"` | Include draft projects ("true" or "false") |

#### Response Format
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "slug": "health-care-awareness-campaign",
      "title": "Health Care Awareness Campaign",
      "category": "Campaign Design",
      "year": 2024,
      "tools": ["Adobe Illustrator", "Adobe Photoshop"],
      "tags": ["healthcare", "social-impact", "campaign"],
      "shortDescription": "A comprehensive health awareness campaign...",
      "coverImage": {
        "url": "https://example.com/image.jpg",
        "alt": "Campaign cover image",
        "width": 1200,
        "height": 800
      },
      "updatedAt": "2024-02-04T19:58:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 25,
    "pages": 3
  },
  "categories": [
    "Brand Identity",
    "Campaign Design",
    "Social Media Design"
  ]
}
```

#### Example Requests
```bash
# Get all published projects
GET /api/gd/projects

# Filter by category
GET /api/gd/projects?category=Brand%20Identity

# Search for projects
GET /api/gd/projects?q=healthcare

# Sort alphabetically with pagination
GET /api/gd/projects?sort=az&page=2&limit=6

# Include draft projects
GET /api/gd/projects?includeDraft=true
```

---

### 2. GET /api/gd/projects/:slug
Get full project details by slug.

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Unique project slug (lowercase, hyphenated) |

#### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `includeDraft` | string | `"false"` | Include draft projects |

#### Response Format
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "slug": "health-care-awareness-campaign",
    "title": "Health Care Awareness Campaign",
    "category": "Campaign Design",
    "shortDescription": "A comprehensive health awareness campaign...",
    "story": "This campaign was designed to raise awareness about preventive healthcare measures...",
    "year": 2024,
    "role": "Lead Graphic Designer",
    "tools": ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
    "tags": ["healthcare", "social-impact", "campaign"],
    "coverImage": {
      "url": "https://example.com/cover.jpg",
      "alt": "Campaign cover",
      "width": 1200,
      "height": 800
    },
    "gallery": {
      "sliderImages": [
        {
          "url": "https://example.com/slider1.jpg",
          "alt": "Campaign hero banner",
          "caption": "Main campaign banner",
          "width": 1920,
          "height": 1080,
          "order": 1
        }
      ],
      "verticalImages": [
        {
          "url": "https://example.com/vertical1.jpg",
          "alt": "Mobile app interface",
          "caption": "Health tracking app",
          "width": 800,
          "height": 1200,
          "order": 1
        }
      ]
    },
    "mockups": [
      {
        "url": "https://example.com/mockup1.jpg",
        "alt": "Billboard mockup",
        "caption": "Campaign billboard",
        "width": 1600,
        "height": 1200,
        "order": 1
      }
    ],
    "isFeatured": true,
    "status": "published",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-02-04T19:58:00.000Z"
  }
}
```

#### Example Requests
```bash
# Get published project
GET /api/gd/projects/health-care-awareness-campaign

# Get draft project
GET /api/gd/projects/draft-project?includeDraft=true
```

---

### 3. POST /api/gd/projects
Create a new project (Admin endpoint).

#### Request Body
```json
{
  "slug": "new-project-slug",
  "title": "New Project Title",
  "category": "Brand Identity",
  "shortDescription": "Brief description of the project",
  "story": "Detailed story about the project (3-8 lines)",
  "year": 2024,
  "role": "Graphic Designer",
  "tools": ["Adobe Illustrator", "Figma"],
  "tags": ["branding", "logo-design"],
  "coverImage": {
    "url": "https://example.com/cover.jpg",
    "alt": "Cover image description",
    "width": 1200,
    "height": 800
  },
  "gallery": {
    "sliderImages": [],
    "verticalImages": []
  },
  "mockups": [],
  "isFeatured": false,
  "status": "draft"
}
```

#### Response
```json
{
  "data": { /* created project */ },
  "message": "Project created successfully"
}
```

---

### 4. PUT /api/gd/projects/:slug
Update an existing project (Admin endpoint).

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Current project slug |

#### Request Body
Same as POST, all fields optional.

#### Response
```json
{
  "data": { /* updated project */ },
  "message": "Project updated successfully"
}
```

---

### 5. DELETE /api/gd/projects/:slug
Delete a project (Admin endpoint).

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Project slug to delete |

#### Response
```json
{
  "message": "Project deleted successfully",
  "data": { /* deleted project */ }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid slug format",
  "message": "Slug must contain only lowercase letters, numbers, and hyphens"
}
```

### 404 Not Found
```json
{
  "error": "Project not found",
  "message": "No project found with slug: example-slug"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error",
  "message": "Failed to fetch projects"
}
```

---

## Data Model

### GDProject Schema

```javascript
{
  slug: String (unique, indexed, lowercase, hyphenated),
  title: String (required),
  category: String (required, indexed),
  shortDescription: String (required),
  story: String (required),
  year: Number (required, 2000-2100),
  role: String (required),
  tools: [String] (indexed),
  tags: [String] (indexed),
  coverImage: {
    url: String (required),
    alt: String (required),
    width: Number (required),
    height: Number (required)
  },
  gallery: {
    sliderImages: [{
      url: String,
      alt: String,
      caption: String,
      width: Number,
      height: Number,
      order: Number
    }],
    verticalImages: [/* same structure */]
  },
  mockups: [/* same structure as gallery images */],
  isFeatured: Boolean (default: false),
  status: "draft" | "published" (default: "draft", indexed),
  createdAt: Date (auto),
  updatedAt: Date (auto, indexed)
}
```

### Indexes
- `slug`: Unique index
- `category`: Single field index
- `status`: Single field index
- `updatedAt`: Descending index
- Text index on: `title`, `tags`, `shortDescription`

---

## Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file:
```env
MONGO_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
NODE_ENV=production
```

### 3. Seed Database
```bash
node scripts/seedGDProjects.js
```

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

---

## Frontend Integration Examples

### Fetch Projects List
```javascript
const fetchProjects = async (category = 'all', page = 1) => {
  const response = await fetch(
    `/api/gd/projects?category=${category}&page=${page}&limit=12`
  );
  const { data, pagination, categories } = await response.json();
  return { data, pagination, categories };
};
```

### Fetch Project Details
```javascript
const fetchProjectBySlug = async (slug) => {
  const response = await fetch(`/api/gd/projects/${slug}`);
  const { data } = await response.json();
  return data;
};
```

### Search Projects
```javascript
const searchProjects = async (query) => {
  const response = await fetch(
    `/api/gd/projects?q=${encodeURIComponent(query)}`
  );
  const { data } = await response.json();
  return data;
};
```

---

## Performance Considerations

- **Pagination**: Default limit of 12, max 100 items per page
- **Indexes**: Optimized for category filtering, text search, and sorting
- **Lean Queries**: Uses `.lean()` for better performance on read operations
- **Image Ordering**: Automatically sorted by `order` field in pre-save hook

---

## Validation Rules

### Slug Format
- Lowercase letters, numbers, and hyphens only
- Pattern: `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`
- Examples: `health-care-campaign`, `branding-2024`

### Year Range
- Minimum: 2000
- Maximum: 2100

### Image URLs
- Must be valid strings
- Should include width and height dimensions

---

## Notes

- All timestamps are in ISO 8601 format
- Images in galleries and mockups are automatically sorted by `order` field
- Only `status="published"` projects are returned by default
- Full-text search uses MongoDB text indexes with weighted fields
- Categories list is dynamically generated from published projects
