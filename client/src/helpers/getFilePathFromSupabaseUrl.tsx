export const getFilePathFromSupabaseUrl = (
  url: string,
  bucket: string
): string | null => {
  // The pattern is /storage/v1/object/public/[bucket_name]/[file_path_in_bucket]
  const parts = url.split(`/storage/v1/object/public/${bucket}/`);
  if (parts.length > 1) {
    return parts[1]; // This is the 'profiles/1750038261571-monkey.jpg' part
  }
  return null;
};
