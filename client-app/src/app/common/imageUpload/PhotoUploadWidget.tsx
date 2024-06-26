import { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget = function ({ loading, uploadPhoto }: Props) {

    const [files, setFiles] = useState<object & {preview?: string}[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {

        return () => {
            files.forEach((file: object & {preview?: string}) => URL.revokeObjectURL(file.preview!));
        }
    }, [files])

    return (
        <Grid>

            <Grid.Column width={1} />

            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>

            <Grid.Column width={1} />

            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 2 - Resize Image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview!} />
                )}
            </Grid.Column>

            <Grid.Column width={1} />

            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 1 - Preview & Upload' />
                {
                    files && files.length > 0 &&
                    <>
                        <div className='image-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>
                }
            </Grid.Column>

            <Grid.Column width={1} />

        </Grid>
    );
};

export default PhotoUploadWidget;