# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flowjomojo is a ReactFlow-based web application that generates ready-made Nextflow/WDL bioinformatics pipelines through drag-and-drop visual workflow composition. It enables bioinformatics researchers to build analysis pipelines without writing code directly.

**Technology Stack:**
- React 19.1.1 + TypeScript 5.8.3 (strict mode)
- @xyflow/react 12.8.6 for workflow visualization
- Vite 7.1.7 build system
- Bootstrap 5.3.8 + Tailwind CSS 4.1.13 for styling
- Deployed to GitHub Pages

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Run linting (ESLint + TypeScript checking)
npm run lint

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

**Important:** The app is configured for GitHub Pages with base path `/KIDS25-Team8_flowjomojo/` in `vite.config.ts`.

## Architecture Overview

### State Management Pattern
Uses React Context + local component state (no Redux/Zustand):

- **DnDContext** (`src/hooks/DnDContext.tsx`): Global drag-and-drop state
  - `dragModule`: Currently dragged module
  - `sidebarModules`: Selected modules in library panel
- **Component State**: Search filters, active panels, workflow nodes/edges

### Core Data Flow
```
commands.json (public/cmdsaw/)
  → retrieveModules() [fetch]
  → SearchBar [filter & select]
  → DnDContext [global state]
  → ModulesLibrary [drag source]
  → Flow [ReactFlow canvas]
  → NodesAndEdges [node editing]
  → TopBar [export PNG]
```

### Key Components Structure
- **App.tsx**: Root layout with sidebar + main canvas
- **Sidebar.tsx**: Three-panel interface (modules-library | nodes-and-edges | share-options)
- **Flow.tsx**: ReactFlow wrapper handling drag-drop and node management
- **SearchBar.tsx**: Module discovery and selection from commands.json
- **ModulesLibrary.tsx**: Selected modules display and drag initiation
- **NodesAndEdges.tsx**: Workflow structure and node property editing
- **nodes/Module.tsx**: Custom ReactFlow node component for bioinformatics modules

## Module System

### Module Definition (commands.json format)
```typescript
{
  id: string,           // Unique identifier
  name: string,         // Display name (e.g., "SAMTOOLS_VIEW")
  label?: string,       // Category/tool group
  description?: string, // Tool description
  inputs: Array<{       // Input parameters
    name: string,
    suffix: string,     // File extension (.bam, .fastq, etc.)
    edam: string,       // EDAM ontology reference
    optional: boolean
  }>,
  outputs?: Array<{     // Output parameters (same structure as inputs)
    // ...
  }>,
  commands: string      // Command template with variables
}
```

### Current Module Data Source
**Location:** `public/cmdsaw/samtools_1.22.1/commands.json`
**Note:** Hardcoded path for samtools 1.22.1. Future versions should support multiple tool collections and configurable paths.

### Drag-and-Drop Flow
1. **Selection:** User clicks module in SearchBar → added to `sidebarModules`
2. **Library Display:** Selected modules shown in ModulesLibrary with drag handles
3. **Drag Initiation:** `onDragStart` sets `dragModule` in DnDContext
4. **Drop Handling:** Flow component converts screen coords to canvas coords, creates ReactFlow node
5. **Node Rendering:** Module.tsx renders node with inputs/outputs and connection handles

## Workflow Visualization

### ReactFlow Integration
- **Node Type:** "module" (custom ModuleNode component)
- **Handles:** Top = target/input, Bottom = source/output
- **Features:** Pan, zoom, select, move, delete nodes
- **Styling:** Selected nodes show pink dashed border and resize handles

### Export Functionality
**Method:** `html-to-image` library converts canvas to PNG
**Output:** 1024x768px image downloaded as "reactflow_viz.png"
**Viewport:** Auto-calculates bounds to include all nodes

## Important Development Notes

### Empty Utility Files (TODO)
- `src/utils/parseModules.ts` - Likely for module validation/transformation
- `src/utils/parseConfigs.ts` - Likely for pipeline code generation (Nextflow/WDL)

### Incomplete Features
- **NodesAndEdges.tsx**: Module editor panel has basic structure but limited functionality
- **ShareOptions.tsx**: Placeholder component for future sharing features
- **Pipeline Generation**: No current implementation for Nextflow/WDL output

### Related Projects
This is part of St. Jude Biohackathon 2025 Team 8, with a related [cmdsaw](https://github.com/stjude-biohackathon/KIDS25-Team8_cmdsaw) project for command discovery.

## Testing Status

**Current:** No testing framework configured
**Available:** TypeScript strict mode + ESLint for code quality
**Recommendation:** Add Vitest for unit testing of module parsing and workflow generation logic

## Deployment Configuration

**Target:** GitHub Pages at subdirectory path
**Base Path:** `/KIDS25-Team8_flowjomojo/` (configured in vite.config.ts)
**Command:** `npm run deploy` (uses gh-pages package)

## Code Quality Tools

- **ESLint 9.36.0** with React hooks and refresh plugins
- **TypeScript 5.8.3** in strict mode
- **Formatting:** Project uses standard React/TypeScript conventions
- **Pre-commit:** No hooks currently configured