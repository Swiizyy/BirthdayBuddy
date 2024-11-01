// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';


import '@sapphire/plugin-hmr/register';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-subcommands/register';

import { PrismaClient } from '@prisma/client';
import { ApplicationCommandRegistries, container, RegisterBehavior } from '@sapphire/framework';
import { setup, type ArrayString } from '@skyra/env-utilities';
import * as colorette from 'colorette';
import { join } from 'path';
import { inspect } from 'util';
import { srcDir } from './constants';

// Set default behavior to bulk overwrite
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

// Read env var
setup({ path: join(srcDir, '.env') });

// Set default inspection depth
inspect.defaultOptions.depth = 1;

// Enable colorette
colorette.createColors({ useColor: true });

// Import Prisma
const prisma = new PrismaClient()
container.prisma = prisma;

declare module '@skyra/env-utilities' {
	interface Env {
		OWNERS: ArrayString;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		prisma: typeof prisma;
	}
}
