from dotenv import load_dotenv
import os
import boto3
from botocore.exceptions import NoCredentialsError

# Load AWS config
load_dotenv()
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME='ap-south-1'

# Initialize S3 client with correct region
s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_S3_REGION_NAME,   # ✅ use from .env
)

def upload_image_to_s3(image_file, image_name):
    """
    Uploads an image file to S3 and returns the public URL.
    """
    try:
        content_type = getattr(image_file, "content_type", "image/jpeg")

        s3.upload_fileobj(
            image_file,
            AWS_STORAGE_BUCKET_NAME,
            image_name,
            ExtraArgs={
                "ContentType": content_type,
                "ACL": "public-read"   # ✅ makes image accessible in browser
            },
        )

        # ✅ Always return proper URL
        return f"https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com/{image_name}"

    except NoCredentialsError:
        print("❌ No AWS Credentials found")
        return None
    except Exception as e:
        print(f"❌ S3 upload error: {e}")
        return None
