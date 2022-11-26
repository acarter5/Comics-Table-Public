import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	DataWriteOptions,
} from "obsidian";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactView } from "./ReactView";
import { createRoot } from "react-dom/client";
// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class ComicsTable extends Plugin {
	settings: MyPluginSettings;
	container: Element;
	logger: (options: { timestamp?: boolean }, ...args: string[]) => void;

	async onload() {
		const { app } = this;
		const registerEvent = this.registerEvent.bind(this);
		// this.registerEvent(
		// 	app.vault.on("create", (file) => {
		// 		console.log("[hf] in create event cb", { file });
		// 	})
		// );
		// this.registerEvent(
		// 	app.vault.on("rename", (file) => {
		// 		console.log("[hf] in rename event cb", { file });
		// 	})
		// );
		// this.registerEvent(
		// 	app.vault.on("modify", (file) => {
		// 		console.log("[hf] in modify event cb", { file });
		// 	})
		// );
		this.logger = (options: { timestamp?: boolean }, ...args: string[]) => {
			const outputFile = app.vault.getAbstractFileByPath(
				"Comics/Inspiration/logs.md"
			);
			if (!!outputFile && outputFile instanceof TFile) {
				app.vault.append(outputFile, "\n");
				app.vault.append(outputFile, "\n");
				if (!!options.timestamp) {
					app.vault.append(outputFile, `${new Date()}`);
					app.vault.append(outputFile, "\n");
				}
				app.vault.append(outputFile, [...args].join(" "));
			}
		};
		const logger = this.logger.bind(this);
		console.log("[hf] onload", { app });
		this.registerMarkdownCodeBlockProcessor(
			"comictable",
			(source, el, ctx) => {
				console.log("[hf]", { source, ctx });
				// const registerEvent = this.registerEvent.bind(this);
				const container = el.createEl("div");
				this.container = container;
				const component = ReactDOM.render(
					React.createElement(ReactView, {
						app,
						ctx,
						registerEvent,
						logger,
					}),
					container
				);
				// paragraph.textContent = "hello!";
				// const rows = source.split("\n").filter((row) => row.length > 0);

				// const table = el.createEl("table");
				// const body = table.createEl("tbody");

				// for (let i = 0; i < rows.length; i++) {
				// 	const cols = rows[i].split(",");

				// 	const row = body.createEl("tr");

				// 	for (let j = 0; j < cols.length; j++) {
				// 		row.createEl("td", { text: cols[j] });
				// 	}
				// }
			}
		);
	}

	onunload() {}

	public registerPriorityCodeblockPostProcessor(
		language: string,
		priority: number,
		processor: (
			source: string,
			el: HTMLElement,
			ctx: MarkdownPostProcessorContext
		) => Promise<void>
	) {
		console.log("[hf] registerPriorityCodeblockPostProcessor", {
			language,
		});
		// let registered = this.registerMarkdownCodeBlockProcessor(
		// 	language,
		// 	processor
		// );
		let registered = this.registerMarkdownCodeBlockProcessor(
			"comictable",
			(source, el, ctx) => {
				console.log("[hf] callback", { source, el, ctx });
				el.textContent = "hi";
			}
		);
		registered.sortOrder = priority;
	}

	public mountMainReactComponent(
		source: string,
		el: HTMLElement,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string
	) {
		const app = this.app;
		console.log("[hf] mountMainReactComponent", { el });
		const root = createRoot(el);
		ReactDOM.render(React.createElement(ReactView, { app }), el);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						console.log("Secret: " + value);
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
