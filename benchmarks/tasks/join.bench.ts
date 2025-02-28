import { Document } from '@gltf-transform/core';
import { join } from '@gltf-transform/functions';
import { Task } from '../constants';
import { LOGGER, createTorusKnotPrimitive } from '../utils';

let _document: Document;

export const tasks: Task[] = [
	[
		'join::sm',
		async () => {
			await _document.transform(join());
		},
		{ beforeEach: () => void (_document = createDocument(10, 64, 64)) }, // ~4000 vertices / prim
	],
	[
		'join::md',
		async () => {
			await _document.transform(join());
		},
		{ beforeEach: () => void (_document = createDocument(4, 512, 512)) }, // ~250,000 vertices / prim
	],
];

function createDocument(primCount: number, radialSegments: number, tubularSegments: number): Document {
	const document = new Document().setLogger(LOGGER);

	const scene = document.createScene();
	for (let i = 0; i < primCount; i++) {
		const prim = createTorusKnotPrimitive(document, { radialSegments, tubularSegments });
		const mesh = document.createMesh().addPrimitive(prim);
		const node = document.createNode().setMesh(mesh);
		scene.addChild(node);
	}

	return document;
}
