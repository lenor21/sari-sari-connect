import { Pencil, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { supabase, supabaseUrl } from '@/lib/supaBaseProfileClient';
import Swal from 'sweetalert2';

const SupabaseProfile = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [uploadProfileUrl, setUploadProfileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const bucketName = 'sari-sari-connect';

  useEffect(() => {
    if (profile) {
      handleProfileUpload(profile);
    }
  }, [profile]);

  const handleProfileUpload = async (img: File) => {
    setUploadProfileUrl(null);
    setIsUploading(true);

    const fileName = `${Date.now()}-${img.name.replace(/\s+/g, '_')}`; // Replace spaces for URL safety

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, img, {
          cacheControl: '3600', // Cache for 1 hour
          upsert: false, // Don't replace if file exists
        });

      if (error) {
        throw error;
      }

      // Construct the public URL
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${data.path}`;
      setUploadProfileUrl(publicUrl);
      // console.log('File uploaded successfully!', publicUrl);
      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'success',
        title: `Profile uploaded successfully!`,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error: any) {
      Swal.fire({
        color: '#0a0a0a',
        position: 'center',
        icon: 'error',
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Button
        className='absolute bottom-0 right-0'
        onClick={() => {
          if (fileRef.current) {
            fileRef.current.click();
          }
        }}>
        {!isUploading ? <Pencil /> : <Loader2Icon className='animate-spin' />}
      </Button>
      <input
        ref={fileRef}
        type='file'
        hidden
        accept='image/*'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setProfile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default SupabaseProfile;
