# Bright Factory Framework

Microsoft's opinionated framework for building agentic software factories: built on GitHub, better with Microsoft and open to the tools your teams already use. Ideas come to life, agents do the heavy lifting, humans monitor and control.

**Read the docs: <https://aiappsgbb.github.io/bff/>**

## Get started with a coding agent

The docs are plain Markdown, so a coding agent can read them and help you plan and build your own factory.

1. Clone this repo next to the repositories you want to work on:

   ```sh
   git clone https://github.com/aiappsgbb/bff.git
   ```

2. Start your coding agent in the `bff` folder. With GitHub Copilot CLI, give it access to your own repo too:

   ```sh
   cd bff
   copilot --add-dir ../my-app
   ```

   Any agent that reads [`AGENTS.md`](AGENTS.md) works, such as agent mode in VS Code. `AGENTS.md` tells the agent where the framework lives and how to use it.

3. Ask for what you need. Some prompts to start with:

   | Goal | Prompt |
   | --- | --- |
   | Learn the framework | `Explain the Bright Factory Framework in five bullets for my team, with links to the docs.` |
   | Find your level | `Run the Find your level self-assessment with me for dependency upgrades, then tell me our autonomy level and the next three moves.` |
   | Check a repo | `Review ../my-app against the factory HQ, floor and foundations, and list the gaps in priority order.` |
   | Plan your factory | `Using the playbook for our level, draft a plan to set up our first bright factory for ../my-app.` |

The playbooks are drafts. Where a step isn't written yet, the agent will say so and use official GitHub and Microsoft documentation instead.

### Without cloning

Point any agent at [`AGENTS.md`](https://aiappsgbb.github.io/bff/AGENTS.md) on the docs site for an index of every page, or at [`llms-full.txt`](https://aiappsgbb.github.io/bff/llms-full.txt) for the full text.

## Licence

[MIT](LICENSE). Fonts: Mona Sans, under the SIL Open Font Licence (see `public/fonts/OFL.txt`).
