import { useRef, useState } from 'react';
import { UploadCloud, X, ImagePlus, AlertCircle } from 'lucide-react';

const ACCEPTED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;

/**
 * GalleryUploader
 * @param {File[]}   files        - controlled state (new files selected)
 * @param {Function} onChange     - (files: File[]) => void
 * @param {string[]} existingUrls - already-saved image paths (edit mode)
 * @param {Function} onRemoveExisting - (index: number) => void
 * @param {number}   maxFiles     - default 8
 * @param {boolean}  single       - single-image mode (featured image)
 * @param {string}   label
 */
export default function GalleryUploader({
  files = [],
  onChange,
  existingUrls = [],
  onRemoveExisting,
  maxFiles = 8,
  single = false,
  label = 'Gallery Images',
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const totalCount = existingUrls.length + files.length;
  const remaining = (single ? 1 : maxFiles) - totalCount;

  const validate = (incoming) => {
    const invalid = incoming.filter(
      (f) => !ACCEPTED.includes(f.type) || f.size > MAX_SIZE_MB * 1024 * 1024
    );
    if (invalid.length) {
      setError(`Some files were skipped — only JPG/PNG/WebP under ${MAX_SIZE_MB}MB allowed.`);
      return incoming.filter(
        (f) => ACCEPTED.includes(f.type) && f.size <= MAX_SIZE_MB * 1024 * 1024
      );
    }
    setError('');
    return incoming;
  };

  const addFiles = (incoming) => {
    const valid = validate(incoming);
    const limit = single ? 1 : maxFiles;
    const slots = limit - existingUrls.length;
    const merged = single
      ? valid.slice(0, 1)
      : [...files, ...valid].slice(0, slots);
    onChange(merged);
  };

  const handleInput = (e) => {
    addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const removeNew = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const IMG_SRC = (f) =>
    f instanceof File ? URL.createObjectURL(f) : `http://localhost:5000/${f}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-xs text-gray-500">
          {totalCount}/{single ? 1 : maxFiles} · max {MAX_SIZE_MB}MB each
        </span>
      </div>

      {/* Drop zone — hidden when single and already has a file */}
      {!(single && totalCount >= 1) && remaining > 0 && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 cursor-pointer transition-all duration-200 ${
            dragging
              ? 'border-gold bg-gold/10'
              : 'border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.05]'
          }`}
        >
          <UploadCloud className={`w-7 h-7 ${dragging ? 'text-gold' : 'text-gray-500'}`} />
          <p className="text-sm text-gray-400">
            <span className="text-gold font-medium">Click to browse</span> or drag & drop
          </p>
          <p className="text-xs text-gray-600">
            {single ? 'JPG, PNG, WebP' : `Up to ${remaining} more · JPG, PNG, WebP`}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            multiple={!single}
            onChange={handleInput}
            className="hidden"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Preview grid */}
      {(existingUrls.length > 0 || files.length > 0) && (
        <div className={`grid gap-2 ${single ? 'grid-cols-1' : 'grid-cols-3 sm:grid-cols-4'}`}>
          {/* Existing saved images */}
          {existingUrls.map((url, i) => (
            <PreviewTile
              key={`existing-${i}`}
              src={IMG_SRC(url)}
              label="Saved"
              labelColor="text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
              onRemove={onRemoveExisting ? () => onRemoveExisting(i) : null}
              single={single}
            />
          ))}

          {/* Newly selected files */}
          {files.map((file, i) => (
            <PreviewTile
              key={`new-${i}`}
              src={IMG_SRC(file)}
              label="New"
              labelColor="text-gold bg-gold/10 border-gold/20"
              onRemove={() => removeNew(i)}
              single={single}
            />
          ))}

          {/* Add more slot */}
          {!single && remaining > 0 && totalCount > 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-gray-600 hover:border-gold/40 hover:text-gold transition-all"
            >
              <ImagePlus className="w-5 h-5" />
              <span className="text-[10px]">Add more</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PreviewTile({ src, label, labelColor, onRemove, single }) {
  return (
    <div className={`relative group rounded-xl overflow-hidden bg-white/5 ${single ? 'h-48' : 'aspect-square'}`}>
      <img src={src} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />

      {/* Label badge */}
      <span className={`absolute top-1.5 left-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded border ${labelColor}`}>
        {label}
      </span>

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all duration-200"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
