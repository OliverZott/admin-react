import axios from "axios";

export default function ImageUpload(props: { uploaded: (url: string) => void }) {




    async function upload(files: FileList | null): Promise<void> {
        if (files === null) return;

        const formData = new FormData();
        formData.append('image', files[0])

        const { data } = await axios.post(`upload`, formData)

        props.uploaded(data.url);
    }

    return (
        <div>
            <label className="btn btn-primary">
                Upload
                <input type="file" hidden onChange={e => upload(e.target.files)}></input>
            </label>
        </div>
    )
}