/**
 * Date: 8/25/19
 * Time: 12:19 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {MidiHeader} from "./header";
import {MidiTrack} from "./track";

export class MidiSong {
	public readonly header: MidiHeader;
	public readonly tracks: MidiTrack[];

	constructor({
		header,
		tracks
	}: {
		header: MidiHeader,
		tracks: MidiTrack[]
	}) {
		this.header = header;
		this.tracks = tracks;
	}

	public clone(): MidiSong {
		return new MidiSong({
			header: _.cloneDeep(this.header),
			tracks: _.cloneDeep(this.tracks)
		});
	}

	public get duration(): number {
		return _.chain(this.tracks)
			.map("sequence.duration")
			.max()
			.value();
	}
}
